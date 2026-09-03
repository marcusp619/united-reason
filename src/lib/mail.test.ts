import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { deliver } from "./mail";

/* `env` is a proxy, so it is replaced wholesale rather than spied on. */
const env = vi.hoisted(() => ({ RESEND_API_KEY: undefined as string | undefined }));
vi.mock("@/env", () => ({ env }));

/**
 * The path a lead travels. Every branch here decides whether a visitor is told
 * their message arrived, so the one thing that must never happen is `sent`
 * coming back from something that didn't send.
 */

const A_MESSAGE = { subject: "Enquiry from Sam", body: "The invoices.", replyTo: "sam@shop.co" };

function withKey(key: string | undefined) {
  env.RESEND_API_KEY = key;
}

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("delivery", () => {
  it("says so when nothing is configured, rather than failing", () => {
    withKey(undefined);
    // Not an error: the site simply isn't receiving mail yet, and the form
    // needs to tell those two situations apart to say the right thing.
    return expect(deliver(A_MESSAGE)).resolves.toEqual({ status: "notConfigured" });
  });

  it("does not reach for the network when nothing is configured", async () => {
    withKey(undefined);
    const fetched = vi.spyOn(globalThis, "fetch");

    await deliver(A_MESSAGE);

    expect(fetched).not.toHaveBeenCalled();
  });

  it("sends the message, addressed so a reply reaches the person", async () => {
    withKey("re_test");
    const fetched = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));

    await expect(deliver(A_MESSAGE)).resolves.toEqual({ status: "sent" });

    const [, init] = fetched.mock.calls[0];
    const body = JSON.parse(String(init?.body));
    expect(body.subject).toBe(A_MESSAGE.subject);
    expect(body.text).toBe(A_MESSAGE.body);
    expect(body.reply_to).toBe(A_MESSAGE.replyTo);
    expect(String(new Headers(init?.headers).get("authorization"))).toContain("re_test");
  });

  it("omits reply-to rather than sending an empty one", async () => {
    withKey("re_test");
    const fetched = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));

    await deliver({ subject: "Add me to the list", body: "Please add sam@shop.co." });

    expect(JSON.parse(String(fetched.mock.calls[0][1]?.body))).not.toHaveProperty("reply_to");
  });

  it("never reports sent when the API refused it", async () => {
    withKey("re_test");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("nope", { status: 422 }));

    await expect(deliver(A_MESSAGE)).resolves.toEqual({ status: "failed" });
  });

  it("never reports sent when the network is gone", async () => {
    withKey("re_test");
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("ECONNREFUSED"));

    await expect(deliver(A_MESSAGE)).resolves.toEqual({ status: "failed" });
  });
});

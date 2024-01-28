<script>
	import screenshotPayroll from '$lib/assets/images/screenshots/payroll.png';
	import screenshotExpenses from '$lib/assets/images/screenshots/expenses.png';
	import screenshotVatReturns from '$lib/assets/images/screenshots/vat-returns.png';
	import screenshotReporting from '$lib/assets/images/screenshots/reporting.png';
    import backgroundImage from '$lib/assets/images/background-features.jpg';

	const features = [
		{
			title: 'Payroll',
			description:
				"Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported.",
			image: screenshotPayroll
		},
		{
			title: 'Claim expenses',
			description:
				"All of your receipts organized into one place, as long as you don't mind typing in the data by hand.",
			image: screenshotExpenses
		},
		{
			title: 'VAT handling',
			description:
				"We only sell our software to companies who don't deal with VAT at all, so technically we do all the VAT stuff they need.",
			image: screenshotVatReturns
		},
		{
			title: 'Reporting',
			description:
				'Easily export your data into an Excel spreadsheet where you can do whatever the hell you want with it.',
			image: screenshotReporting
		}
	];
</script>

<section
	id="features"
	aria-label="Features for running your books"
	class="relative overflow-hidden bg-blue-600 pb-28 pt-20 sm:py-32"
>
	<img
		class="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
		src={backgroundImage}
		alt=""
		width={2245}
		height={1636}
	/>
</section>

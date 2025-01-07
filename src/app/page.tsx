import { Dashboard } from '#/components/Dashboard';
import { Header } from '#/components/headed/header';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '#/components/ui/card';
import { HydrateClient, api } from '#/trpc/server';

export default async function Home() {
	void api.post.getLatest.prefetch();

	const users = await api.users.getUsersList({ page: 2, pageSize: 25 });
	try {
		const currentUser = await api.users.getCurrentUser();
		console.log('currentUser', currentUser);
	} catch (e) {
		console.log('unauth error', e);
	}

	console.log(users);

	return (
		<HydrateClient>
			<div className="flex min-h-screen flex-col">
				<Header />
				<main className="flex-grow">
					<div className="container mx-auto max-w-7xl px-4 py-8">
						<Dashboard />
						<h1 className="mb-6 font-bold text-4xl">Welcome to My Application</h1>
						<Card className="mb-6">
							<CardHeader>
								<CardTitle>About Us</CardTitle>
								<CardDescription>Learn more about our company and mission</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									We are a forward-thinking company dedicated to creating innovative solutions
									for our clients. Our team of experts works tirelessly to deliver high-quality
									products and services that exceed expectations.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Our Services</CardTitle>
								<CardDescription>Discover what we can do for you</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="list-inside list-disc text-muted-foreground">
									<li>Web Development</li>
									<li>Mobile App Design</li>
									<li>UI/UX Consulting</li>
									<li>Cloud Solutions</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</HydrateClient>
	);
}

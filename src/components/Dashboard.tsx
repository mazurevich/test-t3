'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export const Dashboard = () => {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				<img
					src={session.user?.image ?? ''}
					alt="user image"
					className="w-10 h-10 rounded-full"
				/>
				<h1>Wellcome back {session.user?.name} </h1>
				<button type="button" onClick={() => signOut()}>
					Sign out
				</button>
			</>
		);
	}
	return (
		<>
			<h1 className="text-3xl text-red-500 font-bold">You're not logged in</h1>
			<div className="flex ">
				<button
					type="button"
					onClick={() => signIn('google')}
					className="border border-black rounded-lg py-2 px-4"
				>
					Sign in with google
				</button>
				<button
					type="button"
					onClick={() => signIn('github')}
					className="border border-black rounded-lg bg-green-500 py-2 px-4"
				>
					Sign in with github
				</button>
			</div>
		</>
	);
};

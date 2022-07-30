import type { NextPage } from 'next';
import {
	AppShell,
	Center,
	Container,
	Header,
	Space,
	Title,
} from '@mantine/core';
import { Post as PostPrisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { Post } from '../components/post/Post';
export const getServerSideProps = async () => {
	const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
	return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
};
type Props = {
	posts: PostPrisma[];
};
const Home: NextPage<Props> = ({ posts }) => {
	console.log(posts);
	return (
		<AppShell
			padding='lg'
			header={
				<Header height={60} p='xs'>
					<Title order={1}>Twój blog</Title>
				</Header>
			}
			styles={(theme) => ({
				main: { height: '100%' },
			})}>
			<Container size='lg'>
				{posts.map((post) => (
					<>
						<Post
							title={post.title}
							date={post.createdAt}
							content={post.content}
							key={post.id}
							slug={post.slug}
						/>
						<Space h='md' />
					</>
				))}
			</Container>
		</AppShell>
	);
};

export default Home;

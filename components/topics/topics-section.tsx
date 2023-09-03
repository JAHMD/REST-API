import TopicCard from "@/components/topics/topic-card";
import { TopicType } from "@/types";

const TopicsSection = async ({ topics }: { topics: TopicType[] }) => {
	return (
		<>
			<h1 className="text-3xl font-bold">Topics</h1>

			<div className="space-y-6 sm:columns-2 sm:gap-6 lg:columns-3">
				{topics.map((topic) => (
					<TopicCard key={topic._id} topic={topic} />
				))}
			</div>
		</>
	);
};

export default TopicsSection;

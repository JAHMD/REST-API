"use client";

import { getTopicsAction } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { debounce } from "@/utils/utils";
import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import SearchItemSkeleton from "../skeletons/search-item-skeleton";
import { TopicType } from "../types";
import SearchItem from "./search-item";

type SearchTopicProps = {
  unapproved?: boolean;
  userId?: string;
};

export default function SearchTopic({ unapproved, userId }: SearchTopicProps) {
  const [topics, setTopics] = useState<TopicType[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleInputChange = debounce(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value.trim();

      if (!searchValue) {
        setTopics([]);
        return;
      }

      setIsLoading(true);
      const topicsList = await getTopicsAction({
        query: searchValue,
        where: { approved: unapproved ? undefined : true, userId },
      });

      setTopics(topicsList || []);
      setIsLoading(false);
    }
  );

  return (
    <Dialog onOpenChange={() => setTopics([])}>
      <DialogTrigger asChild onClick={() => setIsPopupOpen(true)}>
        <Button
          aria-label="search"
          size="sm"
          variant="outline"
          className="text-xl"
        >
          <Search size={20} />
        </Button>
      </DialogTrigger>
      {isPopupOpen && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search for topic</DialogTitle>
          </DialogHeader>

          <div className="flex-1 space-y-3">
            <label htmlFor="search">Topic</label>
            <Input
              autoComplete="off"
              id="search"
              type="text"
              required
              placeholder="Search for a specific topic"
              onChange={handleInputChange}
            />
          </div>
          <Separator className="my-4" />
          <DialogFooter>
            <ScrollArea className="max-h-[300px] w-full">
              {isLoading ? (
                <SearchItemSkeleton />
              ) : topics.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {topics.map((topic) => (
                    <SearchItem key={topic.id} topic={topic} />
                  ))}
                </div>
              ) : (
                <div className="py-4 text-center">There are no topics</div>
              )}
            </ScrollArea>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}

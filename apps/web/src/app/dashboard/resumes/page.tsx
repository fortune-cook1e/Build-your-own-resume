'use client';

import { useResumeList } from '@/apis/resume/list';
import AuthGuard from '@/components/AuthGuard';
import {
  Heading,
  SkeletonCard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'ui';
import TableList from '@/app/dashboard/resumes/components/TableList';
import { CardList } from '@/app/dashboard/resumes/components/CardList';
import { Cards, Table } from '@phosphor-icons/react';

export type ListType = 'card' | 'table';

const Resumes = () => {
  const { loading, resumeList } = useResumeList();

  return (
    <AuthGuard>
      <div className="w-full space-y-4">
        {loading ? (
          new Array(3).fill(0).map((item) => (
            <div className="flex gap-4" key={item}>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ))
        ) : (
          <Tabs defaultValue="table">
            <TabsList className="flex justify-between bg-background">
              <Heading
                className="pt-1"
                title={`Resumes (${resumeList?.length || 0})`}
              />
              <div>
                <TabsTrigger value="card">
                  <Cards className="mr-2 h-4 w-4" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="table">
                  <Table className="mr-2 h-4 w-4" />
                  Table
                </TabsTrigger>
              </div>
            </TabsList>

            <TabsContent value="card">
              <CardList resumeList={resumeList} />
            </TabsContent>
            <TabsContent value="table">
              <TableList resumeList={resumeList} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AuthGuard>
  );
};

export default Resumes;

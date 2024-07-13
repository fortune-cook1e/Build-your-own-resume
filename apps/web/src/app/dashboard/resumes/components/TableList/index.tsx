import { FC } from 'react';
import { Resume } from 'shared';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import Link from 'next/link';
import dayjs from 'dayjs';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  CoolMode,
} from 'ui';
import { Plus, DotsThree, Pencil, File, Trash } from '@phosphor-icons/react';
import ResumeModal from '@/app/dashboard/resumes/components/ResumeModal';
import { useResumeActions } from '@/app/dashboard/resumes/hooks/useResumeActions';

interface Props {
  resumeList?: Resume[];
}

const TIME_FORMAT = 'YYYY-MM-DD HH:mm';

const TableList: FC<Props> = ({ resumeList = [] }) => {
  const columns: ColumnDef<Resume>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell({ row }) {
        const resume = row.original;

        return (
          <CoolMode>
            <Link href={`/builder/${resume.id}`} className="text-blue-500">
              {row.getValue('title')}
            </Link>
          </CoolMode>
        );
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'visibility',
      header: 'Visibility',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => dayjs(row.getValue('createdAt')).format(TIME_FORMAT),
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated At',
      cell: ({ row }) => dayjs(row.getValue('updatedAt')).format(TIME_FORMAT),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const resume = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8 p-0">
                <DotsThree />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(resume)}>
                <Pencil className="mr-2" />
                <span>Rename</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link
                  href={`/builder/${resume.id}`}
                  className="flex items-center"
                >
                  <File className="mr-2" /> <span>Details</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer text-error"
                onClick={() => onDelete(resume)}
              >
                <Trash className="mr-2" /> <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: resumeList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { open, setMode, mode, setOpen, payload, setPayload } =
    useResumeActions();

  const onAdd = () => {
    setMode('create');
    setOpen.on();
  };

  const onEdit = (resume: Resume) => {
    console.log('edit..');
    setMode('update');
    setPayload({
      ...payload,
      ...resume,
    });
    setOpen.on();
  };

  const onDelete = (resume: Resume) => {
    setMode('delete');
    setPayload({
      ...payload,
      ...resume,
    });
    setOpen.on();
  };

  return (
    <div className="space-y-4">
      <ResumeModal
        open={open}
        toggle={setOpen.toggle}
        onClose={setOpen.off}
        payload={payload}
        mode={mode}
      />

      <div className="flex justify-end">
        <Button onClick={onAdd} icon={<Plus className="mr-2 h-4 w-4" />}>
          Add new
        </Button>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TableList;

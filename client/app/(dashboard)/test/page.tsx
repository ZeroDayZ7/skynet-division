import BadgeShowcase from "../../../components/ui/ui/UserRoleBadge";

export default function TEST() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-lg">
        <BadgeShowcase /> 
      </div>
    </div>
  );
}


// import { columns } from '@/components/ui/ui/TableControl/columns';
// import { DataTable } from '@/components/ui/ui/TableControl/data-table';

// const users = [
//   { id: '1', name: 'Jan Kowalski', email: 'jan@example.com', isActive: true },
//   { id: '2', name: 'Anna Nowak', email: 'anna@example.com', isActive: false },
//   // Dodaj więcej użytkowników według potrzeb
// ];

// export default function Page() {
//   return (
//     <div className="container mx-auto py-10">
//       <DataTable columns={columns} data={users} />
//     </div>
//   );
// }

import BadgeShowcase from "./BADGE-TEST/UserRoleBadge";

export default function TEST() {
  return (
    <div className="flex flex-col justify-center items-center space-y-8 p-8">
      <div className="w-full max-w-lg">
        <BadgeShowcase />  {/* Wywołanie komponentu BadgeShowcase */}
      </div>
    </div>
  );
}

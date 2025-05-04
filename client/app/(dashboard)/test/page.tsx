import BadgeShowcase from "./BADGE-TEST/UserRoleBadge";

export default function TEST() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-lg">
        <BadgeShowcase />  {/* Wywołanie komponentu BadgeShowcase */}
      </div>
    </div>
  );
}

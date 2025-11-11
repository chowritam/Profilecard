import ProfilePanel from "./components/ProfilePanel";

export default function App() {
  return (
    <div className="size-full flex items-center justify-center bg-gray-900 p-4">
      <div className="relative w-full max-w-[640px]">
        <ProfilePanel />
      </div>
    </div>
  );
}

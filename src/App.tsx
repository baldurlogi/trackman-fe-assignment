import Button from "./components/ui/Button";
import CardGrid from "./components/ui/CardGrid";
import { courses } from "./constants";

function App() {
  return (
    <main className="max-w-[1280px] mx-auto p-8 text-center">
      <h1 className="font-bold text-error bg-error-light rounded-md py-4">
        Hello Tailwind v4.1
      </h1>
      <Button
        containerClass={"text-white bg-orange-400"}
        title={"Create Facility"}
        id="create facility"
      ></Button>
      <div className="p-6">
        <CardGrid cards={courses} />
      </div>
    </main>
  );
}

export default App;

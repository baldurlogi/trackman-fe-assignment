import Button from "./components/ui/Button";
import CardGrid from "./components/ui/CardGrid";
import Navbar from "./components/ui/NavBar";
import { courses } from "./constants";

function App() {
  return (
    <main className=" mx-auto text-center">
      <Navbar />
      <div className="px-30">
        <div className="py-6 flex justify-end">
          <Button
            containerClass="text-white bg-orange-400 flex text-2xl justify-end px-12 py-3"
            title={"Create Facility"}
            id="create facility"
          />
        </div>
        <div>
          <CardGrid cards={courses} />
        </div>
      </div>
    </main>
  );
}

export default App;

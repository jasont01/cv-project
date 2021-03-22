import "../css/App.css";
import Header from "./Header";
import Section from "./Section";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const FIELDS = {
  general: ["name", "email", "phone", "linkedin", "github"],
  education: ["school", { dateRange: ["from", "to"] }, "degree"],
  experience: ["company", "role", { dateRange: ["from", "to"] }],
  skills: ["skill"],
};

function App() {
  const sections = [];
  for (const section in FIELDS) {
    sections.push(section);
  }

  return (
    <div className="App">
      <Header />
      <main className="container">
        <div className="row">
          <div className="col-10">
            {sections.map((section, idx) => {
              return (
                <Section
                  key={section}
                  id={idx}
                  title={section}
                  fields={FIELDS[section]}
                />
              );
            })}
          </div>
          <Sidebar />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

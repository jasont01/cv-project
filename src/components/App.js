import Header from "./Header";
import Section from "./Section";
import GithubCorner from "./GithubCorner";

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
          <div className="col-2"></div>
          <div className="col-8 mt-5 pt-5">
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
        </div>
      </main>
      <GithubCorner
        url="https://github.com/jasont01/cv-project"
        vOffset="56px"
        fillColor="steelblue"
      />
    </div>
  );
}

export default App;

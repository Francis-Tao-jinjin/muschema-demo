import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { MuReadStream, MuWriteStream } from "mudb/stream";
import { ProjectSchema, ResourceSchema, UserSchema } from "./muschemaUsage";

function App() {
  // now, create a new object base on Schema is really easy
  const new_project = ProjectSchema.alloc();
  new_project.spec.resourcesUrl.avatarImg = ResourceSchema.alloc();
  new_project.spec.resourcesUrl.avatarImg.id = 1;
  new_project.spec.resourcesUrl.avatarImg.url = "https://cvcvcxccsdsfdssdv";

  const tempResource = ResourceSchema.alloc();
  ResourceSchema.assign(tempResource, new_project.spec.resourcesUrl.avatarImg);
  // please see the console log
  console.log("new_project:", new_project);

  const another_project = ProjectSchema.clone(new_project);
  another_project.name = "project_2";
  console.log("another_project:", another_project);

  const diffOut = new MuWriteStream(1);
  const diff = ProjectSchema.diff(new_project, another_project, diffOut);
  console.log(diff, diffOut);

  const inp = new MuReadStream(diffOut.buffer.uint8);
  const temp_project = ProjectSchema.patch(new_project, inp);
  console.log("temp_project", temp_project);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

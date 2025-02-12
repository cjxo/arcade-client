import { render, screen } from "@testing-library/react";
import TitleScreen from "../../src/routes/TitleScreen";
import { BrowserRouter } from "react-router-dom";

describe("TitleScreen", () => {
  it("renders h1 with Arcade Games", () => {
    render(
      <BrowserRouter>
        <TitleScreen />
      </BrowserRouter>
    );
    
    const heading = screen.getByRole("heading", { name: "Arcade Games" });
    expect(heading).toBeInTheDocument();
  });

  it("renders options 'Select Game' and 'Options'", () => {
    render(
      <BrowserRouter>
        <TitleScreen />
      </BrowserRouter>
    );
    
    const selectGame = screen.getByRole("link", { name: "Select Game" });
    const options = screen.getByRole("link", { name: "Options" });
    
    expect(selectGame).toBeInTheDocument();
    expect(options).toBeInTheDocument();
  });

  it("renders tips", () => {
    render(
      <BrowserRouter>
        <TitleScreen />
      </BrowserRouter>
    );
    
    const navigate = screen.getByText("Navigate");
    const select = screen.getByText("Select");

    expect(navigate).toBeInTheDocument();
    expect(select).toBeInTheDocument();
  });
});

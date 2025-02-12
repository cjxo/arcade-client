import { render, screen } from '@testing-library/react';
import PixelArtCanvas from "../../src/components/PixelArtCanvas";

// https://stackoverflow.com/questions/48828759/unit-test-raises-error-because-of-getcontext-is-not-implemented
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  drawImage: vi.fn(),
  imageSmoothingEnabled: false,
}));

describe("PixelArtCanvas", () => {
  test("Renders canvas with <img />", () => {
    render(<PixelArtCanvas imageSrc="image" alt="pixel art image" />);
    const img = screen.getByRole("img", { hidden: true });
    expect(img).toBeInTheDocument();
  });
});

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import MainPage from '../components/MainPage';
import Product from '../components/Product';

let container = null;
beforeEach(() => {
  // set up a DOM element as a target for rendering
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // clean up on exiting
  unmountComponentAtNode(container);
  container.remove();
  container=null;
});

it ("renders product data", async() => {
  const fakeSmoothie = {
    name: "Papaya Guava Banana Plantain",
    description: "Lots of fruit in here.",
    category: {
    name: "Smoothies",
    id: "smoothies"
    },
    id: "papaya-guava-banana-plantain",
    volume: 22,
    points: 4
    };
    jest.spyOn(global, "axios.get").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeSmoothie)
      })
    );

    await act(async () => {
      render(<Product />, container)
    });

    expect(container.querySelector("p.products-specs").textContent).toBe(fakeSmoothie.description);

    global.fetch.mocRestore();
});


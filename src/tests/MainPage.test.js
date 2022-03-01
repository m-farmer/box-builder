import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import MainPage from "../components/MainPage";
import Product from "../components/Product";
Enzyme.configure({ adapter: new Adapter() });

// to run: npm test a

const mySubscription = {
  id: "sm",
  maxValue: 20,
  maxVolume: 144,
  name: "Small",
};

const fakeSmoothies = [
  {
    name: "Papaya Guava Banana Plantain",
    description: "Lots of fruit in here.",
    category: {
      name: "Smoothies",
      id: "smoothies",
    },
    id: "papaya-guava-banana-plantain",
    volume: 22,
    points: 4,
  },
  {
    name: "Strawberry Peach Pineapple",
    description: "Tons of fruit.",
    category: {
      name: "Smoothies",
      id: "smoothies",
    },
    id: "strawberry-peach-pineapple",
    volume: 21,
    points: 3,
  },
];

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
  container = null;
});

describe("rendering components", () => {
  it("renders MainPage without crashing", () => {
    //shallow = component w/o child components
    shallow(<MainPage />);
  });
  it("renders MainPage component button without crashing", () => {
    const wrapper = shallow(<MainPage />);
    const header = <button id="save-button">Save</button>;
    expect(wrapper.contains(header)).toEqual(true);
  });
});

describe("retrieving data", () => {
  it("renders product data", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeSmoothies),
      })
    );

    await act(async () => {
      render(<MainPage />, container);
    });

    expect(container.querySelector("div").textContent).toContain(
      "SELECT A SUBSCRIPTION"
    );

    global.fetch.mockRestore();
  });
});

describe("passing props", () => {
  const MainPageWrapper = mount(<MainPage products={fakeSmoothies} />);

  it("accepts product props", () => {
    expect(MainPageWrapper.props().products).toEqual(fakeSmoothies);

    const productWrapper = mount(
      <Product product={fakeSmoothies[0]} mySubscription={mySubscription} />
    );

    expect(productWrapper.props().product.description).toEqual(
      "Lots of fruit in here."
    );
  });
});

describe("checking text", () => {
  it("renders proper volume and points", async () => {
    await act(() => {
      render(
        <Product
          product={fakeSmoothies[0]}
          mySubscription={mySubscription}
          volume={fakeSmoothies[0].volume}
          points={fakeSmoothies[0].points}
        />,
        container
      );
    });

    const volume = fakeSmoothies[0].volume;
    const points = fakeSmoothies[0].points;
    expect(container.textContent).toContain(
      `VOLUME: ${volume} in³ | POINTS: ${points}`
    );
  });
});

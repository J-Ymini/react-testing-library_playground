import React from "react";
import {
  render,
  screen,
  renderHook,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { isVisible } from "@testing-library/user-event/dist/utils";
import { useDataMutation } from "./util";
import { act } from "react-dom/test-utils";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("test container", () => {
  test("renders learn react link", async () => {
    render(<App />, { wrapper });

    const setVisibleButton = screen.getByTestId("visible-button");
    const titleInput = screen.getByTestId("title-input");
    const bodyInput = screen.getByTestId("body-input");
    const sendingButton = screen.getByTestId("sending-button");

    const dataListItem = await screen.findAllByTestId("data-list-item");
    expect(dataListItem).toHaveLength(100);

    userEvent.click(setVisibleButton);
    const isvisibleDom = screen.getByTestId("visible-test-element");
    expect(isvisibleDom).toBeInTheDocument();

    userEvent.type(titleInput, "test12345");
    userEvent.type(bodyInput, "test12345");
    userEvent.click(sendingButton);

    const test = await screen.findByTestId("sending-success-message");
    expect(test).toBeInTheDocument();
  });

  test("mutation valid email test", async () => {
    const { result } = renderHook(() => useDataMutation(), { wrapper });
    act(() => {
      result.current.mutate({
        id: 1,
        title: "test12345",
        body: "test12345",
      });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});

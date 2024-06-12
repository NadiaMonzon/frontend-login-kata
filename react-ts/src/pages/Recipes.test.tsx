import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Recipes } from "./Recipes";

describe.skip('Recipes', () => {
    it('should render recipes', () => {
        render(<Recipes />)
    })
})
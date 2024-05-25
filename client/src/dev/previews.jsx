import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import Verso from "../pages/Verso.jsx";

const ComponentPreviews = () => {
  return <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/Verso">
          <Verso/>
      </ComponentPreview>
  </Previews>;
};

export default ComponentPreviews;

import { Canvas } from "@react-three/fiber";
import {
  createXRStore,
  noEvents,
  PointerEvents,
  XR,
  XRStoreOptions,
} from "@react-three/xr";
import { OrbitHandles } from "@react-three/handle";
import { UIKoota } from "./UIKoota";

export default function App() {
  const options: XRStoreOptions = {
    handTracking: true,
    foveation: 0,
    domOverlay: false,
    hand: {
      touchPointer: {
        cursorModel: {
          color: "blue",
          size: 0.2,
        },
      },
      grabPointer: {
        cursorModel: {
          color: "hotpink",
          size: 0.2,
        },
      },
      rayPointer: {
        rayModel: { color: "green" },
        cursorModel: {
          color: "green",
          size: 0.2,
        },
      },
      teleportPointer: false,
    },
    controller: {
      grabPointer: {
        cursorModel: {
          color: "hotpink",
          size: 0.2,
        },
      },
      rayPointer: {
        rayModel: { color: "green" },
        cursorModel: {
          color: "green",
          size: 0.2,
        },
      },
      teleportPointer: false,
    },
  };
  const store = createXRStore(options);
  return (
    <Canvas events={noEvents}>
      <XR store={store}>
        <PointerEvents batchEvents={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        <UIKoota />

        <OrbitHandles />
      </XR>
    </Canvas>
  );
}
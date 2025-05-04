import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitHandles } from "@react-three/handle";
import { type Mesh } from "three";
import {
  createXRStore,
  IfInSessionMode,
  noEvents,
  PointerEvents,
  XR,
  XRStoreOptions,
} from "@react-three/xr";
import { Container, Fullscreen, Root } from "@react-three/uikit";
import { EnterXRButton } from "./EnterXRButton";

function SpinningCube() {
  const cubeRef = useRef<Mesh>(null);

  // Animate rotation using useFrame
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

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


        <mesh>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="blue" />
        </mesh>

        <Root anchorY="bottom" backgroundColor="blue">
            <Container width={400} height={400} backgroundColor="red" />
        </Root>


        <OrbitHandles damping />
        <IfInSessionMode deny={["immersive-ar", "immersive-vr"]}>
        <Fullscreen
          pointerEvents="listener"
          flexDirection="row"
          padding={20}
          paddingRight={50}
           alignItems="flex-start"
          justifyContent="flex-end"
          pointerEventsOrder={2}
        >
          <EnterXRButton />
        </Fullscreen>
        </IfInSessionMode>
      </XR>
    </Canvas>
  );
}

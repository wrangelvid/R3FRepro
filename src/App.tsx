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
import { Container, Fullscreen } from "@react-three/uikit";

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
        <SpinningCube />
        <IfInSessionMode deny={["immersive-ar", "immersive-vr"]}>
          <OrbitHandles />
        </IfInSessionMode>
        <IfInSessionMode allow={["immersive-ar", "immersive-vr"]}>
          <HUD />
        </IfInSessionMode>
      </XR>
    </Canvas>
  );
}


const CUBE_SIZE = 100
// Another funny issue is when we exit the session on the quest, resize the browser and re-enter then the HUD size will change.
function HUD() {
  return (
    <Fullscreen
    flexDirection="column"
    // distanceToCamera={0.1} // This behaves strangely.
    transformTranslateZ={-1000} // Without this the HUD is too close.
    backgroundColor="brown"
    backgroundOpacity={0.3}
    
    >
      <Container>
        <Container width={CUBE_SIZE} height={CUBE_SIZE} backgroundColor="red" />
        <Container marginLeft="auto" width={CUBE_SIZE} height={CUBE_SIZE} backgroundColor="blue" />
      </Container>
      <Container marginTop="auto" >
        <Container width={CUBE_SIZE} height={CUBE_SIZE} backgroundColor="green" />
        <Container marginLeft="auto" width={CUBE_SIZE} height={CUBE_SIZE} backgroundColor="purple" />
      </Container>
    </Fullscreen>
  )
}
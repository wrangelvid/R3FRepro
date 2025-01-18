import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OrbitHandles } from "@react-three/handle";
import { Vector3 } from "three";
import {
  createXRStore,
  noEvents,
  PointerEvents,
  XR,
  XROrigin,
  XRStoreOptions,
} from "@react-three/xr";
import { Container, Fullscreen, Text } from "@react-three/uikit";
import { useComputed, useSignal } from "@preact/signals-react";



export default function App() {
  const store = createXRStore(xrOptions);
  return (
    <Canvas
      events={noEvents}
    
      camera={{ position: [2, -2, 2] }}
    >
      <XR store={store}>
        <PointerEvents batchEvents={false} />
        <XROrigin rotation-x={Math.PI / 2} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        <Triad />
        <OrbitHandleSwitch />
      </XR>
    </Canvas>
  );
}

function OrbitHandleSwitch() {
  const camera = useThree((state) => state.camera);
  const controlMode = useSignal("nothing");
  const buttonText = useComputed(() => {
    switch (controlMode.value) { 
      case "nothing":
        return "Switch to @react-three/drei OrbitControls";
      case "drei":
        return "Switch to @react-three/handle OrbitControls";
      case "handle":
        return "Switch to no controls."
    }});
  return (
    <>
      <Fullscreen flexDirection="row" justifyContent="flex-start" alignItems="flex-start" padding={20}>
        <Container flexDirection="column" gap={20} backgroundColor="lightgray" padding={20}>
          <Text>The Blue Axis (z) should point up!</Text>
          <Container
            backgroundColor="lightblue"
            hover={{ backgroundColor: "orange" }}
            padding={20}
            borderRadius={20}
            onClick={() => {
              switch (controlMode.value) {
                case "nothing":
                  controlMode.value = "drei";
                 break;
                case "drei":
                  controlMode.value = "handle";
                  break;
                case "handle":
                  controlMode.value = "nothing";

                  // Reset the camera.
                  camera.position.set(2, -2, 2);
                  camera.lookAt(new Vector3(0, 0, 0));
                  break;
              }
          }}
          >
            <Text>{buttonText}</Text>
          </Container>
        </Container>
      </Fullscreen>
      {controlMode.value === "drei" && <OrbitControls />}
      {controlMode.value === "handle" && <OrbitHandles />}
    </>
  );
}

function Triad() {
  return (
    <group>
      <mesh position-x={0.6}>
        <boxGeometry args={[1.0,0.2,0.2]}/>
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position-y={0.6}>
        <boxGeometry args={[0.2,1,0.2]}/>
        <meshBasicMaterial color="green" />
      </mesh>
      <mesh position-z={0.6}>
        <boxGeometry args={[0.2,0.2,1]}/>
        <meshBasicMaterial color="blue" />
      </mesh>
    </group>
  )
}

  const xrOptions: XRStoreOptions = {
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
import { Canvas, useThree } from "@react-three/fiber";
import { createScreenCameraStore, OrbitHandles } from "@react-three/handle";
import { Mesh, Vector3 } from "three";
import {
  createXRStore,
  noEvents,
  PointerEvents,
  XR,
  XROrigin,
  XRStoreOptions,
} from "@react-three/xr";
import { Container, Fullscreen, Text } from "@react-three/uikit";
import { useEffect, useRef } from "react";


const cameraStore = createScreenCameraStore();

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
        <OrbitHandles store={cameraStore} />

        <OrbitPositionSwitch />
      </XR>
    </Canvas>
  );
}

function OrbitPositionSwitch() {
  const originRef = useRef<Mesh>(null);
  const cameraRef = useRef<Mesh>(null);
  const camera = useThree((state) => state.camera);

  useEffect(() => {
   // Set the initial camera position (we shouldn't be able to see this). 
   cameraRef.current?.position.copy(camera.position);

   originRef.current?.position.set(...cameraStore.getState().origin);
  }, [])

  return (
    <>
      <Fullscreen flexDirection="row" justifyContent="flex-start" alignItems="flex-start" padding={20} pointerEvents="listener">
        <Container flexDirection="column" gap={20} backgroundColor="lightgray" padding={20}>
          <Container flexDirection="column">
          <Text>Orange ball: The orbit origin</Text>
          <Text>Purple ball: The camera position</Text>
          <Text>We expect never to see the purple ball when we hit sample, as it should match with the camera.</Text>
          </Container>
          <Container
            backgroundColor="lightblue"
            hover={{ backgroundColor: "orange" }}
            padding={20}
            borderRadius={20}
            onClick={() => {
              
              // Sample a new camera position.
              const newCameraPosition = new Vector3(
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
              );
              cameraRef.current?.position.copy(newCameraPosition);
              cameraStore.getState().setCameraPosition(...newCameraPosition.toArray());

              // Sample a new origin position.
              const newOriginPosition = new Vector3(
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
              );
              originRef.current?.position.copy(newOriginPosition);
              cameraStore.getState().setOriginPosition(...newOriginPosition.toArray());
          }}
          >
            <Text>Sample a new Orbit Perspective!</Text>
          </Container>
        </Container>
      </Fullscreen>

      <mesh ref={cameraRef}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="purple" />
      </mesh>
      <mesh ref={originRef}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="orange" />
      </mesh>
    </>
  );
}

function Triad() {
  return (
    <group>
      <mesh position-x={0.6}>
        <boxGeometry args={[1.0,0.2,0.2]}/>
        <meshBasicMaterial color="red" transparent opacity={0.1}/>
      </mesh>
      <mesh position-y={0.6}>
        <boxGeometry args={[0.2,1,0.2]}/>
        <meshBasicMaterial color="green" transparent opacity={0.1}/>
      </mesh>
      <mesh position-z={0.6}>
        <boxGeometry args={[0.2,0.2,1]}/>
        <meshBasicMaterial color="blue" transparent opacity={0.1}/>
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
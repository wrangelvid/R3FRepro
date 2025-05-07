import { Canvas } from "@react-three/fiber";
import { OrbitHandles } from "@react-three/handle";
import {
  noEvents,
  PointerEvents,
} from "@react-three/xr";
import { Text, Container, Fullscreen } from "@react-three/uikit";
import { createWorld, type Entity, trait } from "koota";
import { useQuery, WorldProvider } from "koota/react";
import { useEffect, useMemo } from "react";

export default function App() {

  useEffect(() => {
    const timers = [];
    for (let i = 0; i < 2; i++) {
      timers.push(setTimeout(() => {
        reproduceBug();
      }, i * 2000));
    }

    return () => {
      timers.forEach((timer) => {
        clearTimeout(timer);
      });
      world.reset();
    };

  }, []);

  return (
    <WorldProvider world={world}>
      <Canvas events={noEvents}>
          <PointerEvents batchEvents={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />


          <OrbitHandles damping />
          <Fullscreen pointerEvents="listener">
            <TextList />
          </Fullscreen>
      </Canvas>
    </WorldProvider>
  );
}


const world = createWorld();
const TextTrait = trait({
  text: "", 
});


function reproduceBug() {
  const all_entitites: Entity[] = [];
  for (let i = 0; i < 20; i++) {
    const entity = world.spawn(TextTrait({text: `Hello World ${i}`}));
    all_entitites.push(entity);
  }

  const timer = setTimeout(() => {
    all_entitites.forEach((entity, idx) => {
      setTimeout(() => {
        if (entity.isAlive()) {
          entity.destroy();
        }
      }, idx * 200);
    });
  }, 5000);
  return timer;
}

function TextList() {
  const textEntities = useQuery(TextTrait);

  return (
    <Container flexDirection="column">
      {textEntities.map((entity) => (
        <TextFromEntity key={entity} entity={entity} />
      ))}
    </Container>
  )
}

interface TextFromEntityProps {
  entity: Entity;
}

function TextFromEntity({entity}: TextFromEntityProps) {
  const text = useMemo(() =>  entity.get(TextTrait)!.text, [entity]);

  return (
    <Text>{text}</Text>
  )
}
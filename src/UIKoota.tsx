import { Fullscreen, Root, Text } from "@react-three/uikit";

// Uncomment these two lines for the fullscreen component to render.
import { createWorld } from "koota";
const world = createWorld();

export function UIKoota() {
    return (
        <>
            <FullscreenComponent />
            <RootComponent />
        </>
    );
}

function FullscreenComponent() {
    return (
        <Fullscreen>
            <Text>Fullscreen renders.</Text>
        </Fullscreen>
    )
}


function RootComponent() {
    return (
        <Root>
            <Text>Root renders.</Text>
        </Root>
    )
}
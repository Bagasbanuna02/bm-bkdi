// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { MobileWrapper } from "./main-layout/layout";
import { COLOR } from "@/lib/color-palet";

export const metadata = {
  title: "Baitul Mu'miniin BKDI Bali",
  description: "Website untuk informasi terkait Musolla Baitul Mu'miniin BKDI Bali",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
      style={{ backgroundColor: COLOR.white }}
    >
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <title>{metadata.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body cz-shortcut-listen="true">
        <MantineProvider>
          <MobileWrapper>{children}</MobileWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}

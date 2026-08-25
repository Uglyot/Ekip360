import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: "/yonetim",
  name: "ekip360",
  title: "Ekip 360 CMS",

  projectId: "1gjnai7w",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("İçerik")
          .items([
            S.listItem()
              .title("Blog Yazıları")
              .child(S.documentTypeList("blogPost").title("Blog Yazıları")),
            S.listItem()
              .title("Blog Kategorileri")
              .child(
                S.documentTypeList("blogCategory").title("Blog Kategorileri"),
              ),
            S.divider(),
            S.listItem()
              .title("Referanslar")
              .child(S.documentTypeList("referans").title("Referanslar")),
            S.divider(),
            S.listItem()
              .title("Sıkça Sorulan Sorular")
              .child(S.documentTypeList("faq").title("Sıkça Sorulan Sorular")),
            S.listItem()
              .title("Hizmetlerimiz")
              .child(S.documentTypeList("service").title("Hizmetlerimiz")),
            S.listItem()
              .title("Kimler Yararlanabilir")
              .child(
                S.documentTypeList("whoCanBenefit").title(
                  "Kimler Yararlanabilir",
                ),
              ),
            S.listItem()
              .title("Sanal Tur Avantajları")
              .child(
                S.documentTypeList("virtualTourAdvantage").title(
                  "Sanal Tur Avantajları",
                ),
              ),
            S.divider(),
            S.listItem()
              .title("Ekip Üyeleri")
              .child(S.documentTypeList("teamMember").title("Ekip Üyeleri")),
            S.listItem()
              .title("Slider Görselleri")
              .child(S.documentTypeList("slider").title("Slider Görselleri")),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});

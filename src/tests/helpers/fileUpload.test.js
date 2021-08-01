import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: "ddjfipicp",
    api_key: "637896114189483",
    api_secret: "VIFzbYeejaWFL6hlvhRYc-3AxIM",
    secure: true,
});

describe("Tests for fileUpload.js", function () {
    test("Should load a file and return an url", async () => {
        const resp = await fetch(
            "https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png"
        );
        const blob = await resp.blob();

        const file = new File([blob], "photo.jpg");
        const url = await fileUpload(file);

        expect(typeof url).toBe("string");

        const segmentsUrl = url.split("/");
        const imageId = segmentsUrl[segmentsUrl.length - 1].replace(".png", "");

        const { deleted } = await cloudinary.v2.api.delete_resources(imageId);
        expect(deleted).toEqual({ [imageId]: "deleted" });
    });

    test("Should return null when there is any image", async () => {
        const file = new File([], "photo.jpg");
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});

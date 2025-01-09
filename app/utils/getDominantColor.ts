import ColorThief from "color-thief-browser";

/**
 * Extract dominant color from an image URL
 * @param imageUrl URL of the image
 * @returns Promise<[number, number, number]>
 */
export const getDominantColor = async (
  imageUrl: string
): Promise<[number, number, number]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Ensure CORS compatibility for external images
    img.src = imageUrl;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img) as [
          number,
          number,
          number
        ];
        resolve(dominantColor);
      } catch (error) {
        reject(new Error("Failed to extract dominant color"));
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};

// /**
//  * 이미지에서 주요 색상을 추출하는 함수
//  * @param imageSrc 이미지 경로 (src)
//  * @returns 주요 색상 [R, G, B]
//  */
// export const getDominantColor = (
//   imageSrc: string
// ): Promise<[number, number, number]> => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();

//     img.crossOrigin = "anonymous"; // CORS 설정 (외부 이미지 처리 가능)
//     img.src = imageSrc;

//     img.onload = () => {
//       try {
//         const colorThief = new ColorThief();
//         const dominantColor = colorThief.getColor(img) as [
//           number,
//           number,
//           number
//         ];
//         resolve(dominantColor);
//       } catch (error) {
//         reject(new Error("Failed to extract dominant color"));
//       }
//     };

//     img.onerror = () => {
//       reject(new Error("Failed to load image"));
//     };
//   });
// };

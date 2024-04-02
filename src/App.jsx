import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";

const App = () => {
  const [image, setImage] = useState(null);
  const [imageStyles, setImageStyles] = useState({
    blur: 0,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    opacity: 100,
    saturate: 100,
    sepia: 0,
  });
  const [active, setActive] = useState(null);
  const [min, setMin] = useState(0);
  const elementRef = useRef(null);
  const [max, setMax] = useState(100);
  const [value, setValue] = useState(50);
  const [filter, setFilter] = useState({
    filter: `blur(${imageStyles.blur / 20}px) brightness(${
      imageStyles.brightness
    }%) contrast(${imageStyles.contrast}%) grayscale(${
      imageStyles.grayscale
    }%) hue-rotate(${(360 / 100) * imageStyles.hueRotate}deg) invert(${
      imageStyles.invert
    }%) opacity(${imageStyles.opacity}%) saturate(${
      imageStyles.saturate
    }%) sepia(${imageStyles.sepia}%)`,
  });
  useEffect(() => {
    setFilter({
      filter: `blur(${imageStyles.blur / 20}px) brightness(${
        imageStyles.brightness
      }%) contrast(${imageStyles.contrast}%) grayscale(${
        imageStyles.grayscale
      }%) hue-rotate(${(360 / 100) * imageStyles.hueRotate}deg) invert(${
        imageStyles.invert
      }%) opacity(${imageStyles.opacity}%) saturate(${
        imageStyles.saturate
      }%) sepia(${imageStyles.sepia}%)`,
    });
  }, [imageStyles]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  const filterHandler = (v) => {
    setActive(v);
    setMin(0);
    setMax(200);
    switch (v) {
      case "Contrast":
        setValue(imageStyles.contrast);
        break;
      case "Brightness":
        setValue(imageStyles.brightness);
        break;
      case "Blur":
        setValue(imageStyles.blur);
        break;
      case "GrayScale":
        setValue(imageStyles.grayscale);
        break;
      case "Hue rotate":
        setValue(imageStyles.hueRotate);
        break;
      case "Saturate":
        setValue(imageStyles.saturate);
        break;
      case "Sepia":
        setValue(imageStyles.sepia);
        break;
      case "Opacity":
        setValue(imageStyles.opacity);
        break;
    }
  };
  const valueHandler = (val, act) => {
    setValue(val);
    switch (act) {
      case "Contrast":
        setImageStyles({ ...imageStyles, contrast: val });
        break;
      case "Brightness":
        setImageStyles({ ...imageStyles, brightness: val });
        break;
      case "Blur":
        setImageStyles({ ...imageStyles, blur: val });
        break;
      case "GrayScale":
        setImageStyles({ ...imageStyles, grayscale: val });
        break;
      case "Hue rotate":
        setImageStyles({ ...imageStyles, hueRotate: val });
        break;
      case "Saturate":
        setImageStyles({ ...imageStyles, saturate: val });
        break;
      case "Sepia":
        setImageStyles({ ...imageStyles, sepia: val });
        break;
      case "Opacity":
        setImageStyles({ ...imageStyles, opacity: val });
        break;
    }
  };
  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const reset = () => {
    setImageStyles({
      blur: 0,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      opacity: 100,
      saturate: 100,
      sepia: 0,
    })
    setImage(null)
    setActive(null)
  }
  return (
    <div className="w-100 pb-[50px] min-h-[100vh] bg-[#333]">
      <h1 className="text-[4rem] text-[#ddd] text-center pt-5 pb-2 font-bold max-[768px]:text-[3rem] max-[500px]:text-[2rem]">
        Online Photoshop
      </h1>
      <div className="text-center mb-10">
        {image ? (
          <button
            className="px-3 py-2 bg-blue-300 rounded"
            onClick={reset}
          >
            Upload new image
          </button>
        ) : (
          <input type="file" onChange={handleFileChange} />
        )}
      </div>
      <div className="flex min-h-[600px] max-w-[1440px] mx-auto gap-3 p-3 max-[820px]:flex-wrap">
        <div className="border border-[#555] rounded w-[40%] flex items-center justify-center max-[820px]:w-full max-[820px]:h-[500px] max-[400px]:h-[400px]">
          <div ref={elementRef} className="w-full h-full">
            {image && (
              <img
                src={image}
                style={filter}
                className="w-full h-full object-contain"
                alt="Tanlangan Rasm"
              />
            )}
          </div>
        </div>
        <div className="border relative border-[#555] rounded w-[60%] h-100 max-[820px]:w-full max-[820px]:pb-[30px]">
          <ul className="grid-cols-8 grid p-5 gap-5 m-0 max-[1240px]:grid-cols-5 max-[991px]:text-[15px] max-[820px]:grid-cols-8 max-[820px]:text-[12px] max-[568px]:grid-cols-4">
            <li
              className={`text-center text-[#ddd] filter-item cursor-pointer ${active == 'Contrast' ? "active" : ""}`}
              onClick={() => filterHandler("Contrast")}
            >
              <span className="flex items-center justify-center w-auto mb-1 aspect-square text-[2.5rem] max-[768px]:text-[22px] text-[#ddd] border rounded-full">
                <i className="fa fa-circle-half-stroke"></i>
              </span>
              Contrast
            </li>
            <li
              className={`text-center cursor-pointer filter-item text-[#ddd] ${active == 'Brightness' ? "active" : ""}`}
              onClick={() => filterHandler("Brightness")}
            >
              <span className="flex items-center justify-center w-auto mb-1 aspect-square text-[2.5rem] max-[768px]:text-[22px] text-[#ddd] border rounded-full">
                <i className="fa fa-sun"></i>
              </span>
              Brightness
            </li>
            <li
              className={`text-center cursor-pointer filter-item text-[#ddd] ${active == 'Blur' ? "active" : ""}`}
              onClick={() => filterHandler("Blur")}
            >
              <span className="flex items-center justify-center w-auto mb-1 aspect-square text-[2.5rem] max-[768px]:text-[22px] text-[#ddd] border rounded-full">
                <i className="fa fa-droplet"></i>
              </span>
              Blur
            </li>
            <li
              className={`text-center cursor-pointer filter-item text-[#ddd] ${active == 'GrayScale' ? "active" : ""}`}
              onClick={() => filterHandler("GrayScale")}
            >
              <span className="flex items-center justify-center w-auto mb-1 aspect-square text-[2.5rem] max-[768px]:text-[22px] text-[#ddd] border rounded-full">
                <i className="fa fa-square"></i>
              </span>
              GrayScale
            </li>
            <li
              className={`text-center cursor-pointer filter-item text-[#ddd] ${active == 'Hue rotate' ? "active" : ""}`}
              onClick={() => filterHandler("Hue rotate")}
            >
              <span className="flex items-center justify-center w-auto mb-1 aspect-square text-[2.5rem] max-[768px]:text-[22px] text-[#ddd] border rounded-full">
                <i className="fa fa-palette"></i>
              </span>
              Hue rotate
            </li>
            <li
              className={`text-center cursor-pointer filter-item text-[#ddd] ${active == 'Saturate' ? "active" : ""}`}
              onClick={() => filterHandler("Saturate")}
            >
              <span className="flex items-center justify-center w-auto mb-1 aspect-square text-[2.5rem] max-[768px]:text-[22px] text-[#ddd] border rounded-full">
                <i className="fa fa-temperature-half"></i>
              </span>
              Saturate
            </li>
            <li
              className={`text-center cursor-pointer filter-item text-[#ddd] ${active == 'Sepia' ? "active" : ""}`}
              onClick={() => filterHandler("Sepia")}
            >
              <span className="flex items-center justify-center w-auto mb-1 aspect-square text-[2.5rem] max-[768px]:text-[22px] text-[#ddd] border rounded-full">
                <i className="fa fa-filter"></i>
              </span>
              Sepia
            </li>
            <li
              className={`text-center cursor-pointer filter-item text-[#ddd] ${active == 'Opacity' ? "active" : ""}`}
              onClick={() => filterHandler("Opacity")}
            >
              <span className="flex items-center justify-center w-auto mb-1 aspect-square text-[2.5rem] max-[768px]:text-[22px] text-[#ddd] border rounded-full">
                <i className="fa fa-fire-flame-simple"></i>
              </span>
              Opacity
            </li>
          </ul>
          {active && image && (
            <div className="px-5 pb-[50px] max-[820px]:pb-3 absolute bottom-0 w-full start-0">
              <span className="text-white mb-5 block text-center text-[1.5rem] max-[820px]:hidden">
                {active}
              </span>
              <input
                type="range"
                className="transparent rounded h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
                min={min}
                max={max}
                value={value}
                onChange={(e) => valueHandler(e.target.value, active)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center pt-10">
        {image != null && (
          <button
            className="px-3 py-2 bg-blue-600 rounded text-slate-200 hover:bg-blue-800 transition-all"
            onClick={htmlToImageConvert}
          >
            Download Image
          </button>
        )}
      </div>
    </div>
  );
};

export default App;

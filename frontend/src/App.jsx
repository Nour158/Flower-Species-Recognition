import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  CheckCircle2,
  Flower2,
  ImagePlus,
  Leaf,
  LoaderCircle,
  RotateCcw,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X
} from "lucide-react";

const FLOWERS = {
  daisy: {
    emoji: "🌼",
    description: "A cheerful flower with white petals and a yellow center."
  },
  dandelion: {
    emoji: "🌾",
    description: "A bright yellow wildflower known for its fluffy seed head."
  },
  rose: {
    emoji: "🌹",
    description: "A layered, fragrant flower commonly associated with love."
  },
  sunflower: {
    emoji: "🌻",
    description: "A tall flower with a large golden head that follows sunlight."
  },
  tulip: {
    emoji: "🌷",
    description: "A smooth, cup-shaped spring flower available in many colors."
  }
};

function formatLabel(label = "") {
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function App() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const rankedPredictions = useMemo(() => {
    if (!result?.probabilities) return [];
    return Object.entries(result.probabilities)
      .sort((a, b) => b[1] - a[1])
      .map(([name, probability]) => ({ name, probability }));
  }, [result]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function acceptFile(selectedFile) {
    setError("");
    setResult(null);

    if (!selectedFile) return;

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/bmp"];
    if (!allowed.includes(selectedFile.type)) {
      setError("Please choose a JPG, PNG, WEBP, or BMP image.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("The image must be smaller than 10 MB.");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview("");
    setResult(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function classify() {
    if (!file) {
      setError("Upload a flower image first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Prediction failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the prediction server. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    acceptFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div className="app-shell">
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="FloraLens home">
          <span className="brand-mark">
            <Flower2 size={23} />
          </span>
          <span>
            <strong>FloraLens</strong>
            <small>AI Flower Recognition</small>
          </span>
        </a>

        <div className="model-pill">
          <span className="status-dot" />
          DenseNet121 ready
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="eyebrow">
            <Sparkles size={15} />
            Deep learning, made simple
          </div>

          <h1>
            Discover your flower
            <span> in seconds.</span>
          </h1>

          <p>
            Upload a clear flower photo and let our ImageNet-pretrained
            DenseNet121 model identify its species.
          </p>

          <div className="class-list">
            {Object.entries(FLOWERS).map(([name, flower]) => (
              <span key={name}>
                {flower.emoji} {formatLabel(name)}
              </span>
            ))}
          </div>
        </section>

        <section className="workspace">
          <div className="upload-card">
            <div className="card-heading">
              <div>
                <p className="step-label">STEP 01</p>
                <h2>Upload a flower image</h2>
              </div>
              {file && (
                <button className="icon-button" onClick={reset} title="Remove image">
                  <X size={19} />
                </button>
              )}
            </div>

            {!preview ? (
              <button
                className={`drop-zone ${dragging ? "dragging" : ""}`}
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
              >
                <span className="upload-icon">
                  <UploadCloud size={32} />
                </span>
                <strong>Drop your image here</strong>
                <span>or click to browse from your device</span>
                <small>JPG, PNG, WEBP or BMP · Maximum 10 MB</small>
              </button>
            ) : (
              <div className="preview-wrapper">
                <img src={preview} alt="Selected flower preview" />
                <div className="preview-overlay">
                  <button onClick={() => inputRef.current?.click()}>
                    <ImagePlus size={17} />
                    Change photo
                  </button>
                </div>
                <div className="file-details">
                  <div>
                    <CheckCircle2 size={18} />
                    <span>
                      <strong>{file.name}</strong>
                      <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                    </span>
                  </div>
                  <span>Ready to analyze</span>
                </div>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              hidden
              accept=".jpg,.jpeg,.png,.webp,.bmp,image/*"
              onChange={(event) => acceptFile(event.target.files?.[0])}
            />

            {error && <div className="error-message">{error}</div>}

            <button
              className="primary-button"
              disabled={!file || loading}
              onClick={classify}
            >
              {loading ? (
                <>
                  <LoaderCircle className="spinner" size={20} />
                  Analyzing image...
                </>
              ) : (
                <>
                  <ScanSearch size={20} />
                  Identify flower
                </>
              )}
            </button>
          </div>

          <div className={`result-card ${result ? "has-result" : ""}`}>
            <div className="card-heading">
              <div>
                <p className="step-label">STEP 02</p>
                <h2>Prediction result</h2>
              </div>
              {result && <Activity size={22} className="accent-icon" />}
            </div>

            {!result && !loading && (
              <div className="empty-result">
                <span>
                  <Leaf size={34} />
                </span>
                <h3>Your result will appear here</h3>
                <p>
                  Upload a flower photo and click “Identify flower” to see the
                  prediction and confidence scores.
                </p>
              </div>
            )}

            {loading && (
              <div className="analysis-state">
                <div className="scan-frame">
                  {preview && <img src={preview} alt="" />}
                  <div className="scan-line" />
                </div>
                <h3>Examining petals and patterns...</h3>
                <p>DenseNet121 is processing your image.</p>
              </div>
            )}

            {result && (
              <div className="prediction">
                <div className="winner">
                  <div className="winner-emoji">
                    {FLOWERS[result.predicted_class]?.emoji || "🌸"}
                  </div>
                  <div>
                    <span>Most likely species</span>
                    <h3>{formatLabel(result.predicted_class)}</h3>
                    <p>{FLOWERS[result.predicted_class]?.description}</p>
                  </div>
                  <div className="confidence-ring">
                    <strong>{Math.round(result.confidence * 100)}%</strong>
                    <span>confidence</span>
                  </div>
                </div>

                <div className="probability-section">
                  <div className="section-title">
                    <h4>All predictions</h4>
                    <span>Model confidence</span>
                  </div>

                  <div className="probability-list">
                    {rankedPredictions.map(({ name, probability }, index) => (
                      <div className="probability-row" key={name}>
                        <div className="probability-label">
                          <span className="rank">{index + 1}</span>
                          <span>{FLOWERS[name]?.emoji}</span>
                          <strong>{formatLabel(name)}</strong>
                          <b>{(probability * 100).toFixed(1)}%</b>
                        </div>
                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{ width: `${Math.max(probability * 100, 1)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="secondary-button" onClick={reset}>
                  <RotateCcw size={17} />
                  Analyze another image
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="feature-strip">
          <article>
            <span><ScanSearch size={21} /></span>
            <div>
              <strong>Five flower classes</strong>
              <p>Daisy, dandelion, rose, sunflower, and tulip.</p>
            </div>
          </article>
          <article>
            <span><Sparkles size={21} /></span>
            <div>
              <strong>Transfer learning</strong>
              <p>Built with an ImageNet-pretrained DenseNet121.</p>
            </div>
          </article>
          <article>
            <span><ShieldCheck size={21} /></span>
            <div>
              <strong>Private by design</strong>
              <p>Your image is processed only for prediction.</p>
            </div>
          </article>
        </section>
      </main>

      <footer>
        <Flower2 size={17} />
        Flower Species Recognition · DenseNet121
      </footer>
    </div>
  );
}

export default App;

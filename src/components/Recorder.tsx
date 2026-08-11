import { useRecorder } from "../lib/useRecorder";

export function Recorder() {
  const { isRecording, audioUrl, error, start, stop, reset } = useRecorder();

  return (
    <div className="recorder">
      <div className="recorder-controls">
        {!isRecording ? (
          <button type="button" className="btn btn-record" onClick={start}>
            ● Ghi âm
          </button>
        ) : (
          <button type="button" className="btn btn-record btn-record-active" onClick={stop}>
            ■ Dừng
          </button>
        )}
        {audioUrl && (
          <button type="button" className="btn btn-chip" onClick={reset}>
            Xoá bản ghi
          </button>
        )}
      </div>
      {error && <p className="error-text">{error}</p>}
      {audioUrl && (
        <audio className="recorder-playback" src={audioUrl} controls />
      )}
    </div>
  );
}

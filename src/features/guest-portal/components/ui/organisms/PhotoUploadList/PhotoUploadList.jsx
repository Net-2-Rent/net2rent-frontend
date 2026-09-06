import FileUpload from "../../../../../../shared/components/ui/molecules/FileUpload/FileUpload.jsx";
import "./PhotoUploadList.scss";

export default function PhotoUploadList({
  value = [],
  onChange,
  maxFiles = 3,
}) {
  const slots = value.length < maxFiles ? [...value, null] : value;

  function handleSlotChange(index, file) {
    const next = [...value];
    if (file) {
      next[index] = file;
    } else {
      next.splice(index, 1);
    }
    onChange(next);
  }

  return (
    <div className="photo-upload-list">
      {slots.map((file, index) => (
        <FileUpload
          key={index}
          id={`photo-${index}`}
          value={file}
          accept="image/jpeg,image/png"
          onChange={(selected) => handleSlotChange(index, selected)}
        />
      ))}
      {value.length > 0 && (
        <p className="photo-upload-list__count">
          {value.length}/{maxFiles} imágenes
        </p>
      )}
    </div>
  );
}

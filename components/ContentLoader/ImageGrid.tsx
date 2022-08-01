import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

function ContentLoaderImageGrid(props: IContentLoaderProps) {
  return (
    <ContentLoader
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      height={575}
      viewBox="0 0 800 575"
      width={800}
      {...props}
    >
      <rect height="10" rx="2" ry="2" width="140" x="537" y="9" />
      <rect height="11" rx="2" ry="2" width="667" x="14" y="30" />
      <rect height="211" rx="2" ry="2" width="211" x="12" y="58" />
      <rect height="211" rx="2" ry="2" width="211" x="240" y="57" />
      <rect height="211" rx="2" ry="2" width="211" x="467" y="56" />
      <rect height="211" rx="2" ry="2" width="211" x="12" y="283" />
      <rect height="211" rx="2" ry="2" width="211" x="240" y="281" />
      <rect height="211" rx="2" ry="2" width="211" x="468" y="279" />
      <circle cx="286" cy="536" r="12" />
      <circle cx="319" cy="535" r="12" />
      <circle cx="353" cy="535" r="12" />
      <rect height="24" rx="0" ry="0" width="52" x="378" y="524" />
      <rect height="24" rx="0" ry="0" width="52" x="210" y="523" />
      <circle cx="210" cy="535" r="12" />
      <circle cx="428" cy="536" r="12" />
    </ContentLoader>
  );
}

ContentLoaderImageGrid.metadata = {
  description: 'Image Grid with Pagination',
  filename: 'ImageGrid',
  github: 'bitIO',
  name: 'Francisco Calle',
};

export default ContentLoaderImageGrid;

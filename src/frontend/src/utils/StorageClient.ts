// StorageClient stub for video upload functionality
// Real implementation would use the blob storage extension

export class StorageClient {
  constructor(
    private bucketName: string,
    private gatewayUrl: string,
    private canisterId: string,
    private projectId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private agent: any,
  ) {}

  async putFile(
    bytes: Uint8Array,
    onProgress?: (pct: number) => void,
  ): Promise<{ hash: string }> {
    // Upload via multipart POST to the storage gateway
    const formData = new FormData();
    formData.append("file", new Blob([bytes as unknown as BlobPart]));
    formData.append("bucket", this.bucketName);
    formData.append("canisterId", this.canisterId);
    formData.append("projectId", this.projectId);

    onProgress?.(10);

    const response = await fetch(`${this.gatewayUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    onProgress?.(90);

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = (await response.json()) as { hash: string };
    onProgress?.(100);
    return { hash: data.hash };
  }
}

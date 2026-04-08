class StorageClient {
  constructor(bucketName, gatewayUrl, canisterId, projectId, agent) {
    this.bucketName = bucketName;
    this.gatewayUrl = gatewayUrl;
    this.canisterId = canisterId;
    this.projectId = projectId;
    this.agent = agent;
  }
  async putFile(bytes, onProgress) {
    const formData = new FormData();
    formData.append("file", new Blob([bytes]));
    formData.append("bucket", this.bucketName);
    formData.append("canisterId", this.canisterId);
    formData.append("projectId", this.projectId);
    onProgress == null ? void 0 : onProgress(10);
    const response = await fetch(`${this.gatewayUrl}/upload`, {
      method: "POST",
      body: formData
    });
    onProgress == null ? void 0 : onProgress(90);
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
    const data = await response.json();
    onProgress == null ? void 0 : onProgress(100);
    return { hash: data.hash };
  }
}
export {
  StorageClient
};

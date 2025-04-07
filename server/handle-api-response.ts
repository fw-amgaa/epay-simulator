import tryCatch from "../lib/try-catch";

export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const result = await tryCatch(response.json());

    let errorMessage = "Мэдэгдэхгүй алдаа гарлаа.";
    if (
      result.data &&
      typeof result.data === "object" &&
      "message" in result.data
    ) {
      errorMessage = result.data.message as string;
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

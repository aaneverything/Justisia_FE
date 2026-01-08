import type { ChatApiResponse, ChatApiRequest } from '@/types';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function sendChatMessage(question: string): Promise<ChatApiResponse> {
  const request: ChatApiRequest = { question };

  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// Dummy response for testing when backend is not available
export function getDummyResponse(): ChatApiResponse {
  return {
    answer: "Berdasarkan konteks yang diberikan, tidak ada informasi mengenai isi Pasal 27 UU ITE. Konteks yang tersedia menyebutkan Pasal 27 terkait dengan sanksi administratif bagi kapal penangkap ikan yang tidak memiliki perizinan berusaha ([1], [2]), serta perubahan pengacuan Pasal 27 ayat (1) ke Pasal 407 ([3]).\n\nOleh karena itu, saya tidak dapat merangkum isi Pasal 27 UU ITE dari konteks yang diberikan.\n",
    context: [
      {
        content: "Pasal 27 ayat (1), dikenai sanksi administratif.\n(21 Setiap Orang yang mengoperasikan kapal\npenangkap Ikan berbendera Indonesia di wilayah\nPengelolaan Perikanan Negara Republik Indonesia,\nyang tidak membawa dokumenPerizinan Berusaha\nsebagaimana dimaksud dalam Pasal 27 ayat (31,\ndikenai sanksi administratif.",
        citation: "Pasal 27 ayat (1)",
        uu_code: "UU_CIPTA_KERJA_2023",
        pasal: "27",
        ayat: "1"
      },
      {
        content: "Kewajiban memenuhi Perizinan Berusaha\nsebagaimana dimaksud pada ayat (1) dan/atau\nmembawa dokumen Perizinan Berusaha\nsebagaimana dimaksud pada ayat (3) tidak berlaku\nbagi Nelayan Kecil.\nDi antara Pasal 27 dan Pasal 28 disisipkan 1 (satu)\npasal, yakni Pasal 27A sehingga berbunyi sebagai\nberikut:\nPasal 27 A",
        citation: "Pasal 27 ayat (5)",
        uu_code: "UU_CIPTA_KERJA_2023",
        pasal: "27",
        ayat: "5"
      },
      {
        content: "Pasal 27 ayat (1) dan Pasal 45 ayat (1) pengacuannya diganti dengan Pasal 407;",
        citation: "Pasal 622 ayat (a)",
        uu_code: "KUHP_2023",
        pasal: "622",
        ayat: "a"
      }
    ]
  };
}

import SupportTicket from "#ro/models/support/SupportTicket";
import { Op } from "sequelize";

interface GetAllMessagesOptions {
    page: number;
    limit: number;
    status?: string;
    query?: string;
  }
  
  // Pobieranie wszystkich wiadomości dla admina
  export async function getAllMessages(options: GetAllMessagesOptions) {
    const { page, limit, status, query } = options;
  
    // Oblicz offset
    const offset = (page - 1) * limit;
  
    // Warunki filtrowania
    const where: any = {};
  
    // Filtr statusu
    if (status && status !== 'all') {
      where.status = status;
    }
  
    // Wyszukiwanie po subject lub user_id
    if (query) {
      where[Op.or] = [
        { subject: { [Op.iLike]: `%${query}%` } },
        { user_id: { [Op.eq]: parseInt(query) || 0 } },
      ];
    }
  
    // Pobierz tickety z paginacją
    const { rows: tickets, count: totalItems } = await SupportTicket.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  
    return { tickets, totalItems };
  }
  
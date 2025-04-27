import telebot
from telebot import types
import psycopg2
import uuid
from decimal import Decimal, ROUND_DOWN

# Конфигурация бота и базы данных
TOKEN = '7394017273:AAECE86i2vJPFemrVvd6rGgcYS83hHscRbY'
bot = telebot.TeleBot(TOKEN)

DB_HOST = 'localhost'
DB_PORT = '5432'
DB_NAME = 'CryptoEx'
DB_USER = 'postgres'
DB_PASS = 'hujiyg67859D'

def get_db_connection():
    """Устанавливаем соединение с базой данных PostgreSQL."""
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )

def generate_order_number():
    """Генерируем уникальный номер ордера (8 символов)."""
    return str(uuid.uuid4()).replace("-", "")[:8]

def round_to_tenthousandths(value):
    """Округляем значение до 4 знаков после запятой."""
    return Decimal(value).quantize(Decimal('0.0001'), rounding=ROUND_DOWN)

def notify_website(order_id, status):
    """
    Заглушка для подключения к API сайта.
    Здесь можно реализовать вызов внешнего API, например с использованием requests.
    """
    print(f"[API STUB] Заказ {order_id} обновлён до статуса {status}")

@bot.message_handler(commands=['start'])
def start_handler(message):
    bot.send_message(message.chat.id, "Добро пожаловать! Этот бот предназначен для подтверждения или отклонения оплаты заказа.")

@bot.message_handler(commands=['order'])
def order_handler(message):
    """
    Обрабатываем команду /order <order_id>.
    Получаем информацию о заказе из базы данных и выводим её с кнопками для подтверждения/отклонения.
    """
    parts = message.text.split()
    if len(parts) != 2:
        bot.send_message(message.chat.id, "Пожалуйста, используйте команду: /order <order_id>")
        return

    order_id = parts[1]
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "SELECT id, from_currency, to_currency, amount, rate, total, email, payment_details, status, created_at "
            "FROM orders WHERE id = %s", (order_id,)
        )
        order = cur.fetchone()
        if order is None:
            bot.send_message(message.chat.id, "Заказ не найден.")
            return

        # Округляем сумму до 4 знаков
        total = round_to_tenthousandths(order[5])

        # Формируем сообщение с информацией о заказе и читаемым форматом даты
        order_details = (
            f"Заказ #{order[0]}\n"
            f"Отдаёте: {order[1]}\n"
            f"Получаете: {order[2]}\n"
            f"Сумма: {order[3]}\n"
            f"Курс: {order[4]}\n"
            f"Итого: {total}\n"
            f"Email: {order[6]}\n"
            f"Платёжные данные: {order[7]}\n"
            f"Статус: {order[8]}\n"
            f"Создан: {order[9].strftime('%d-%m-%Y %H:%M:%S')}\n"
        )

        # Создаем инлайн-клавиатуру с кнопками
        markup = types.InlineKeyboardMarkup()
        markup.add(types.InlineKeyboardButton("Подтвердить оплату", callback_data=f"confirm_{order_id}"))
        markup.add(types.InlineKeyboardButton("Отклонить оплату", callback_data=f"cancel_{order_id}"))

        bot.send_message(message.chat.id, order_details, reply_markup=markup)
        cur.close()
    except Exception as e:
        bot.send_message(message.chat.id, f"Ошибка при получении заказа: {e}")
    finally:
        if conn:
            conn.close()

@bot.callback_query_handler(func=lambda call: True)
def callback_handler(call):
    """
    Обрабатываем нажатия кнопок.
    Если пользователь подтвердил оплату — обновляем статус на "fulfilled",
    если отклонил — на "canceled".
    
    После выбора, инлайн-клавиатура удаляется и сообщение обновляется стандартным текстом.
    """
    data = call.data
    if data.startswith("confirm_"):
        order_id = data.split("_")[1]
        update_order_status(order_id, "fulfilled")
        notify_website(order_id, "fulfilled")
        # Удаляем кнопки (сбрасываем клавиатуру) и обновляем текст сообщения
        bot.edit_message_reply_markup(chat_id=call.message.chat.id, message_id=call.message.message_id, reply_markup=None)
        bot.edit_message_text(chat_id=call.message.chat.id, message_id=call.message.message_id,
                              text=f"Заказ {order_id} подтверждён. Оплата принята.")
        bot.answer_callback_query(call.id, "Оплата подтверждена!")
    elif data.startswith("cancel_"):
        order_id = data.split("_")[1]
        update_order_status(order_id, "canceled")
        notify_website(order_id, "canceled")
        bot.edit_message_reply_markup(chat_id=call.message.chat.id, message_id=call.message.message_id, reply_markup=None)
        bot.edit_message_text(chat_id=call.message.chat.id, message_id=call.message.message_id,
                              text=f"Заказ {order_id} отклонён. Оплата не принята.")
        bot.answer_callback_query(call.id, "Оплата отклонена!")

def update_order_status(order_id, new_status):
    """Обновляем статус заказа в базе данных."""
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("UPDATE orders SET status = %s WHERE id = %s", (new_status, order_id))
        conn.commit()
        cur.close()
    except Exception as e:
        print(f"Ошибка обновления заказа: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    print("Бот запущен")
    bot.polling(none_stop=True)

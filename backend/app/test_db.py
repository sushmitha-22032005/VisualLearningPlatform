from app.database import check_database_connection

result = check_database_connection()

print("PostgreSQL connection successful!")
print("Test result:", result)

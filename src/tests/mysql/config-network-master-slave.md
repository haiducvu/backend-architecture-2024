CHANGE MASTER TO
MASTER_HOST='172.24.0.3',
MASTER_PORT=3306,
MASTER_USER='root',
MASTER_PASSWORD='passroot',
master_log_file='mysql-bin.000003',
master_log_pos=157,
master_connect_retry=60,
GET_MASTER_PUBLIC_KEY=1;
# Étape 1 : build de votre app Vite  
FROM node:18-alpine AS builder  
WORKDIR /app  
COPY package*.json ./  
RUN npm ci  
COPY . .  
RUN npm run build  

# Étape 2 : servir via NGINX sur port custom  
FROM nginx:stable-alpine  

# 1. Définition du port configurable  
ARG PORT=5000  
ENV PORT=${PORT}  

# 2. Remplacement de la directive listen dans default.conf  
RUN sed -i "s/listen 80;/listen ${PORT};/" /etc/nginx/conf.d/default.conf  

# 3. Nettoyage du dossier webroot et copie des assets  
RUN rm -rf /usr/share/nginx/html/*  
COPY --from=builder /app/dist /usr/share/nginx/html  

# 4. Exposition du port interne  
EXPOSE ${PORT}  

# 5. Lancement de NGINX  
CMD ["nginx", "-g", "daemon off;"]

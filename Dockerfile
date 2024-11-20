# Stage 2: Copy build files to Nginx
FROM nginx:alpine

# Copy the custom nginx.conf to the Nginx configuration directory
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy build files to Nginx html directory
# COPY --from=build /app/dist /usr/share/nginx/html
COPY ./build /usr/share/nginx/html
# test

# Expose the necessary port for Nginx
EXPOSE 80
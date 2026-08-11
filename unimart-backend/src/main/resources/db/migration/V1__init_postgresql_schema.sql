-- ============================================================
-- Flyway Migration V1: PostgreSQL Schema Initialization
-- Ported from MySQL Guide 05 to PostgreSQL
-- ============================================================

-- 1. Reusable Trigger Function for auto-updating updated_at columns
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    student_id VARCHAR(100),
    campus_location VARCHAR(255),
    avatar VARCHAR(500),
    verified_student BOOLEAN DEFAULT TRUE,
    role VARCHAR(50) DEFAULT 'ROLE_STUDENT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger for users.updated_at
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_users_updated_at') THEN
        CREATE TRIGGER trg_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

-- 3. Listings Table
CREATE TABLE IF NOT EXISTS listings (
    id VARCHAR(36) PRIMARY KEY,
    sku VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(2000),
    price DOUBLE PRECISION NOT NULL CHECK (price >= 0),
    original_price DOUBLE PRECISION,
    category VARCHAR(100) NOT NULL,
    condition VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    seller_id VARCHAR(36) CONSTRAINT fk_listings_seller REFERENCES users(id) ON DELETE CASCADE,
    campus_location VARCHAR(255),
    campus_zone VARCHAR(100),
    is_hot_deal BOOLEAN DEFAULT FALSE,
    stock INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger for listings.updated_at
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_listings_updated_at') THEN
        CREATE TRIGGER trg_listings_updated_at
        BEFORE UPDATE ON listings
        FOR EACH ROW
        EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

-- 4. Listing Bundle Items Table (ElementCollection)
CREATE TABLE IF NOT EXISTS listing_bundle_items (
    listing_id VARCHAR(36) NOT NULL CONSTRAINT fk_bundle_items_listing REFERENCES listings(id) ON DELETE CASCADE,
    item VARCHAR(255) NOT NULL
);

-- 5. Composite Index for Performance Optimization
CREATE INDEX IF NOT EXISTS idx_listings_category_price ON listings(category, price);

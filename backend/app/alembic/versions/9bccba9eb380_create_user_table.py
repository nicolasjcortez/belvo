"""create user table

Revision ID: 9bccba9eb380
Revises: 
Create Date: 2022-10-15 04:17:45.803874

"""
from xmlrpc.client import Boolean
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9bccba9eb380'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('email', sa.String(50), nullable=False),
        sa.Column('username', sa.String(50), nullable=False),
        sa.Column('hashed_password', sa.String(200), nullable=False),
        sa.Column('is_active', sa.Boolean),
    )


def downgrade() -> None:
    op.drop_table('users')